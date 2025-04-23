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
    tasks = [wait_random(max_delay) for _ in range(n)]
    delays = await asyncio.gather(*tasks)
    
    # Sort delays without using sort()
    sorted_delays: List[float] = []
    for delay in delays:
        # Insert delay in the correct position to maintain ascending order
        position = 0
        while (position < len(sorted_delays) and 
               delay > sorted_delays[position]):
            position += 1
        sorted_delays.insert(position, delay)
    
    return sorted_delays
