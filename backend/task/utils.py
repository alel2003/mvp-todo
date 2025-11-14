from functools import reduce

def count_times_tomates(pomodoro_duration: int, end_time_pomodoro: int):
    times_list = []
    res = pomodoro_duration - end_time_pomodoro
    return reduce(lambda x, y: x + y, times_list)

