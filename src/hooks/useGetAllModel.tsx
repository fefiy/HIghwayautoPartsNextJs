'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllModel } from '@/redux/model/slice';
import { RootState } from '@/redux/store'
import { IOptional } from '@/interface';

interface ChildrenProps {
  models: IOptional[];
  isLoading: boolean;
}

const DataFetcher = ({ children }: { children: (props: ChildrenProps) => React.ReactNode }) => {
  const dispatch = useDispatch();
  const { models, isLoading } = useSelector((state: RootState) => state.models);



  
  useEffect(() => {
    dispatch(getAllModel());
  }, [dispatch]);

  return children({ models, isLoading });
};

export default DataFetcher;