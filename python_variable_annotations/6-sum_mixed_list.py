#!/usr/bin/env python3
"""Module that provides a function to sum a list of integers and floats."""

from typing import List, Union


def sum_mixed_list(mxd_lst: List[Union[int, float]]) -> float:
    """
    Calculate the sum of a list containing both integers and floats.

    Args:
        mxd_lst (List[Union[int, float]]): List of integers and floats to sum.

    Returns:
        float: The sum of all elements in the input list as a float.
    """
    return float(sum(mxd_lst))
