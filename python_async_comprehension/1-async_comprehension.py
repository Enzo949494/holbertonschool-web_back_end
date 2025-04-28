#!/usr/bin/env python3
"""async_comprehension coroutine module"""
from typing import List
import asyncio

async_generator = __import__('0-async_generator').async_generator


async def async_comprehension() -> List[float]:
    """
    Coroutine that collects 10 random numbers using an
    async comprehension over async_generator.
    Returns a list of 10 random numbers.
    """
    return [number async for number in async_generator()]
