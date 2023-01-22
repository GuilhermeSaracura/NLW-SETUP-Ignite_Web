import * as Popover from '@radix-ui/react-popover';
import { clsx } from 'clsx';
import { ProgressBar } from './ProgressBar';
import dayjs from 'dayjs';
import { HabitsList } from './HabitsList';
import { useState } from 'react';

interface HabitDayProps{
    date: Date
    defaultCompleted?: number
    amount?: number
}

export function HabitDay({defaultCompleted=0, amount=0, date}:HabitDayProps){
    const [completed, setCompleted] = useState(defaultCompleted)

    const completePercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0

    const dayAndMonth = dayjs(date).format('DD/MM')
    const weekDay = dayjs(date).format('dddd')


    function handleCompletedChange(completed: number){
        setCompleted(completed)
    }

    return(
        <Popover.Root>
        <Popover.Trigger className={clsx("w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background",{
            'bg-zinc-900  border-zinc-800': completePercentage==0,
            'bg-violet-900 border-violet-800': completePercentage>0 && completePercentage <20,
            'bg-violet-800 border-violet-700': completePercentage>=20 && completePercentage <40,
            'bg-violet-700 border-violet-600': completePercentage>=40 && completePercentage <60,
            'bg-violet-600 border-violet-500': completePercentage>=60 && completePercentage <80,
            'bg-violet-500 border-violet-400': completePercentage>=80
        })}/>
            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col focus:outline-none'>
                    <span className='font-semibold text-zinc-400'>{weekDay}</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>
                    <ProgressBar progress={completePercentage}/>
                    <HabitsList date={date} onCompletedChanged={handleCompletedChange}/>
                    <Popover.Arrow height={8} width={16} className='fill-zinc-900'/>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}