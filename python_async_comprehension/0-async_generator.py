#!/usr/bin/env python3
"""async_generator coroutine function"""
import random
import asyncio
from typing import AsyncGenerator


async def async_generator() -> AsyncGenerator[float, None]:
    """
    coroutine that loops 10 times, waiting 1 second for each
    time and yields random number between 0 and 10.
    """

    for _ in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)
