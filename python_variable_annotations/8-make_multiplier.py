#!/usr/bin/env python3
"""Module that provides a function to create a multiplier function."""

from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """
    Create a function that multiplies a float by the given multiplier.

    Args:
        multiplier (float): The value to multiply by.

    Returns:
        Callable[[float], float]: A function that takes a float
        and returns a float.
    """
    def multiply(n: float) -> float:
        """
        Multiply the input by the stored multiplier value.

        Args:
            n (float): Number to multiply.

        Returns:
            float: Result of multiplying n by the stored multiplier.
        """
        return n * multiplier

    return multiply
