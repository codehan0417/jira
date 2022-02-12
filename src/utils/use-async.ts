import {useState} from 'react'
import { useMountedRef } from 'utils';
interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}
const defaultConfig={
    throwError:false
}
// useState直接传入函数的意义，惰性初始化，所以要用useSatate保存函数，不能直接传入函数
export const useAsync = <D>(initialState?: State<D>,initialConfig?:typeof defaultConfig)=>{
    const config={...defaultConfig,initialConfig};
    const [state,setState]=useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })

    const mountedRef=useMountedRef();
    const setData=(data:D)=>setState({
        data,
        stat:'success',
        error:null
    })
    const setError=(error:Error)=>setState({
        error,
        stat:'error',
        data:null
    })
    const run=(promise:Promise<D>)=>{
        if(!promise || !promise.then){
            throw new Error("请输入 Promise 类型数据");
        }
        setState({...state,stat:'loading'})
        return promise.then(data=>{
            if(mountedRef.current)
            setData(data);
            return data;
        }).catch(error=>{
            setError(error);
            if(config)return Promise.reject(error);
            return error;
        })
    }
    return {
        isIdle:state.stat==='idle',
        isLoading:state.stat==='loading',
        isError:state.stat==='error',
        isSuccess:state.stat==='success',
        run,
        setData,
        setError,
        ...state
    }
}