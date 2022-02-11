import { useEffect,useRef,useState } from "react";

export const isFalsy=(value:unknown)=>value===0?false:!value;

export const isVoid=(value:unknown)=>value===undefined || value===null || value===""
export const cleanObject=(obj:{[key:string]:unknown})=>{
    const result={...obj};
    Object.keys(result).forEach(key=>{
        const value=result[key];
        if(isVoid(value)){
            delete result[key];
        }
    })
    return result;
}


export const useMount=(callback:()=>void)=>{
    useEffect(()=>{
        callback();
        // 依赖项里加上callback会造成无线循环，这个和useCallback及useMemo有关
        
    },[])
}

export const useDebounce=<V>(value:V,delay?:number)=>{
    const [debounceValue,setDebounceValue]=useState(value);
    useEffect(()=>{
        // 每次value变化之后，设置一个定时器
        const timeout=setTimeout(()=>setDebounceValue(value),delay);
        // 每次在上一个useEffect处理完之后再运行
        return ()=>clearTimeout(timeout)
    },[value,delay])

    return debounceValue;
}

export const useArray=<T>(initialArray:T[])=>{
    const [value,setValue]=useState(initialArray);
    return {
        value,
        setValue,
        add:(item:T)=>setValue([...value,item]),
        clear:()=>setValue([]),
        removeIndex:(index:number)=>{
            const copy=[...value];
            copy.splice(index,1);
            setValue(copy);
        }
    }
}


// 设置文档标题
export const useDocumnetTitle=(title:string,keepOnUnmount:boolean=true)=>{
    const oldTitle=useRef(document.title).current;
    // 页面加载时：旧title
    // 页面加载后:新title
    useEffect(()=>{
        document.title=title;
    },[title])
    useEffect(()=>{
        return ()=>{
            if(!keepOnUnmount){

                document.title=oldTitle;
            }
        }
    },[keepOnUnmount,oldTitle])
}