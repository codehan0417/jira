import { useEffect,useState } from "react";

export const isFalsy=(value:unknown)=>value===0?false:!value;
export const cleanObject=(obj:Object)=>{
    const result={...obj};
    Object.keys(result).forEach(key=>{
        // @ts-ignore
        const value=result[key];
        if(isFalsy(value)){
            // @ts-ignore
            delete result[key];
        }
    })
    return result;
}


export const useMount=(callback:()=>void)=>{
    useEffect(()=>{
        callback();
    },[])
}

export const useDebounce=(value:unknown,delay?:number):any=>{
    const [debounceValue,setDebounceValue]=useState(value);
    useEffect(()=>{
        // 每次value变化之后，设置一个定时器
        const timeout=setTimeout(()=>setDebounceValue(value),delay);
        // 每次在上一个useEffect处理完之后再运行
        return ()=>clearTimeout(timeout)
    },[value,delay])

    return debounceValue;
}