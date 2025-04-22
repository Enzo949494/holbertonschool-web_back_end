#!/usr/bin/env python3
"""Module that provides a function to create a
   tuple from a string and number.
"""

from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """
    Create a tuple from a string and the square of a number.

    Args:
        k (str): String to use as the 1st element of the tuple.
        v (Union[int, float]): Number to square for the 2nd element.

    Returns:
        Tuple[str, float]: A tuple containing the string
        k and the square of v as a float.
    """
    return (k, float(v ** 2))
