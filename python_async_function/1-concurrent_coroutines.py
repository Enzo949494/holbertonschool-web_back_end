#!/usr/bin/env python3
"""
Module for concurrent coroutines
"""

import asyncio
from typing import List

wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """
    Asynchronous routine that spawns wait_random n times with the
    specified max_delay.

    Args:
        n (int): Number of times to spawn wait_random
        max_delay (int): Maximum delay in seconds

    Returns:
        List[float]: List of all delays in ascending order
    """
    tasks = []
    for _ in range(n):
        tasks.append(asyncio.create_task(wait_random(max_delay)))
    delays = await asyncio.gather(*tasks)
    
    # Manual bubble sort implementation (explicitly not using sort())
    result: List[float] = list(delays)  # Create a copy to sort
    length = len(result)
    
    for i in range(length):
        for j in range(0, length - i - 1):
            if result[j] > result[j + 1]:
                # Swap elements
                result[j], result[j + 1] = result[j + 1], result[j]
    
    return result
