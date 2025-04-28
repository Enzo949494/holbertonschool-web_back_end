#!/usr/bin/env python3
"""Measuring runtime of async comprehensions"""
import asyncio
import time

async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """
    Executes async_comprehension four times in parallel using asyncio.gather
    and returns the total runtime.
    """
    start_time = time.perf_counter()

    # Create a list of coroutines and unpack it with * in gather
    coroutines = [async_comprehension() for _ in range(4)]
    await asyncio.gather(*coroutines)

    end_time = time.perf_counter()
    return end_time - start_time
