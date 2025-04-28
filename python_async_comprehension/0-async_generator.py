#!/usr/bin/env python3
"""async_generator coroutine function"""
import asyncio
import random
from typing import Generator, Any


async def async_generator() -> Generator[float, None, None]:  # type: ignore
    """
    coroutine that loops 10 times, waiting 1 second for each
    time and yields random number between 0 and 10.
    """
    for _ in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)
