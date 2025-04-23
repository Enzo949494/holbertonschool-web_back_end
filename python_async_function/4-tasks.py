#!/usr/bin/env python3
"""
Module for concurrent tasks
"""

import asyncio
from typing import List

task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """
    Asynchronous routine that spawns task_wait_random n times with the
    specified max_delay.

    Args:
        n (int): Number of times to spawn task_wait_random
        max_delay (int): Maximum delay in seconds

    Returns:
        List[float]: List of all delays in ascending order
    """
    tasks = [task_wait_random(max_delay) for _ in range(n)]
    delays = []

    # Process tasks in the order they complete
    for task in asyncio.as_completed(tasks):
        delay = await task
        delays.append(delay)

    return delays
