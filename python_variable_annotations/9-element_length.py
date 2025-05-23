#!/usr/bin/env python3
"""Module that provides a function to get the length
   of elements in a sequence."""

from typing import Iterable, Sequence, List, Tuple


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """
    Calculate the length of each element in the input iterable.

    Args:
        lst (Iterable[Sequence]): An iterable containing sequences.

    Returns:
        List[Tuple[Sequence, int]]: A list of tuples, where each tuple contains
        a sequence from the input and its length.
    """
    return [(i, len(i)) for i in lst]
