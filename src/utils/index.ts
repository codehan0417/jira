import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => value === 0 ? false : !value;

export const isVoid = (value: unknown) => value === undefined || value === null || value === ""
export const cleanObject = (obj: { [key: string]: unknown }) => {
    const result = { ...obj };
    Object.keys(result).forEach(key => {
        const value = result[key];
        if (isVoid(value)) {
            delete result[key];
        }
    })
    return result;
}

// 封装 componentDidMount
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
        // 依赖项里加上callback会造成无线循环，这个和useCallback及useMemo有关

    }, [])
}

// 封装节流，避免多次触发
export const useDebounce = <V>(value: V, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        // 每次value变化之后，设置一个定时器
        const timeout = setTimeout(() => setDebounceValue(value), delay);
        // 每次在上一个useEffect处理完之后再运行
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debounceValue;
}




// 设置文档标题
export const useDocumnetTitle = (title: string, keepOnUnmount: boolean = true) => {
    const oldTitle = useRef(document.title).current;
    // 页面加载时：旧title
    // 页面加载后:新title
    useEffect(() => {
        document.title = title;
    }, [title])
    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {

                document.title = oldTitle;
            }
        }
    }, [keepOnUnmount, oldTitle])
}

// 重置路由
export const resetRoute = () => window.location.href = window.location.origin


/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
 export const subset = <
 O extends { [key in string]: unknown },
 K extends keyof O
>(
 obj: O,
 keys: K[]
) => {
 const filteredEntries = Object.entries(obj).filter(([key]) =>
   keys.includes(key as K)
 );
 return Object.fromEntries(filteredEntries) as Pick<O, K>;
};


/**
 * 返回组件的挂载状态，如果还没挂载或已卸载，返回false，反之返回true
 */
export const useMountedRef = () => {
    const mountedRef = useRef(false);
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false
        }
    })
    return mountedRef
}