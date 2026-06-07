'use client';

import * as React from 'react';
import { useIsoLayoutEffect } from '@base-ui/utils/useIsoLayoutEffect';
import { useStableCallback } from '@base-ui/utils/useStableCallback';
import { useTimeout } from '@base-ui/utils/useTimeout';
import { isElementVisible } from "../utils/composite.js";
import { contains } from "../utils/element.js";
import { stopEvent } from "../utils/event.js";
/**
 * Provides a matching callback that can be used to focus an item as the user
 * types, often used in tandem with `useListNavigation()`.
 * @see https://floating-ui.com/docs/useTypeahead
 */
export function useTypeahead(context, props) {
  const {
    listRef,
    elementsRef,
    activeIndex,
    onMatch: onMatchProp,
    onTyping,
    enabled = true,
    resetMs = 750,
    selectedIndex = null
  } = props;
  const store = 'rootStore' in context ? context.rootStore : context;
  const open = store.useState('open');
  const timeout = useTimeout();
  const stringRef = React.useRef('');
  const prevIndexRef = React.useRef(selectedIndex ?? activeIndex ?? -1);
  const matchIndexRef = React.useRef(null);
  const onKeyDown = useStableCallback(event => {
    function isVisible(index) {
      const element = elementsRef?.current[index];
      return !element || isElementVisible(element);
    }
    function getMatchingIndex(list, string, startIndex = 0) {
      if (list.length === 0) {
        return -1;
      }
      const normalizedStartIndex = (startIndex % list.length + list.length) % list.length;
      const lowerString = string.toLocaleLowerCase();
      for (let offset = 0; offset < list.length; offset += 1) {
        const index = (normalizedStartIndex + offset) % list.length;
        const text = list[index];
        if (!text?.toLocaleLowerCase().startsWith(lowerString) || !isVisible(index)) {
          continue;
        }
        return index;
      }
      return -1;
    }
    const listContent = listRef.current;
    if (stringRef.current.length > 0 && event.key === ' ') {
      // Space should continue the in-progress typeahead session.
      stopEvent(event);
      onTyping?.(true);
    }
    if (stringRef.current.length > 0 && stringRef.current[0] !== ' ') {
      if (getMatchingIndex(listContent, stringRef.current) === -1 && event.key !== ' ') {
        onTyping?.(false);
      }
    }
    if (listContent == null ||
    // Character key.
    event.key.length !== 1 ||
    // Modifier key.
    event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }
    if (open && event.key !== ' ') {
      stopEvent(event);
      onTyping?.(true);
    }

    // Capture whether this is a new typing session before mutating the string.
    const isNewSession = stringRef.current === '';
    if (isNewSession) {
      prevIndexRef.current = selectedIndex ?? activeIndex ?? -1;
    }

    // Bail out if the list contains a word like "llama" or "aaron". TODO:
    // allow it in this case, too.
    const allowRapidSuccessionOfFirstLetter = listContent.every(text => text ? text[0]?.toLocaleLowerCase() !== text[1]?.toLocaleLowerCase() : true);

    // Allows the user to cycle through items that start with the same letter
    // in rapid succession.
    if (allowRapidSuccessionOfFirstLetter && stringRef.current === event.key) {
      stringRef.current = '';
      prevIndexRef.current = matchIndexRef.current;
    }
    stringRef.current += event.key;
    timeout.start(resetMs, () => {
      stringRef.current = '';
      prevIndexRef.current = matchIndexRef.current;
      onTyping?.(false);
    });

    // Compute the starting index for this search.
    // If this is a new typing session (string is empty), base it on the current
    // selection/active item; otherwise continue from the last matched index.
    const prevIndex = isNewSession ? selectedIndex ?? activeIndex ?? -1 : prevIndexRef.current;
    const startIndex = (prevIndex ?? 0) + 1;
    const index = getMatchingIndex(listContent, stringRef.current, startIndex);
    if (index !== -1) {
      onMatchProp?.(index);
      matchIndexRef.current = index;
    } else if (event.key !== ' ') {
      stringRef.current = '';
      onTyping?.(false);
    }
  });
  const onBlur = useStableCallback(event => {
    const next = event.relatedTarget;
    const currentDomReferenceElement = store.select('domReferenceElement');
    const currentFloatingElement = store.select('floatingElement');
    const withinComposite = contains(currentDomReferenceElement, next) || contains(currentFloatingElement, next);

    // Keep the session if focus moves within the composite (reference <-> floating).
    if (withinComposite) {
      return;
    }

    // End the current typing session when focus leaves the composite entirely.
    timeout.clear();
    stringRef.current = '';
    prevIndexRef.current = matchIndexRef.current;
    onTyping?.(false);
  });
  useIsoLayoutEffect(() => {
    if (!open && selectedIndex !== null) {
      return;
    }
    timeout.clear();
    matchIndexRef.current = null;
    if (stringRef.current !== '') {
      stringRef.current = '';
    }
  }, [open, selectedIndex, timeout]);
  useIsoLayoutEffect(() => {
    // Sync arrow key navigation but not typeahead navigation.
    if (open && stringRef.current === '') {
      prevIndexRef.current = selectedIndex ?? activeIndex ?? -1;
    }
  }, [open, selectedIndex, activeIndex]);
  const sharedProps = React.useMemo(() => ({
    onKeyDown,
    onBlur
  }), [onKeyDown, onBlur]);
  return React.useMemo(() => enabled ? {
    reference: sharedProps,
    floating: sharedProps
  } : {}, [enabled, sharedProps]);
}