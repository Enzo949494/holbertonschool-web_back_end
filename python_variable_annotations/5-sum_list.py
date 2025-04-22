#!/usr/bin/env python3
"""Module that provides a function to sum a list of floats."""

from typing import List


def sum_list(input_list: List[float]) -> float:
    """
    Calculate the sum of a list of floating point numbers.

    Args:
        input_list (List[float]): List of floats to sum.

    Returns:
        float: The sum of all elements in the input list.
    """
    return sum(input_list)
