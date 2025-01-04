"use client";

import { useEffect } from "react";
import { useDispatch } from "@/utils/useDispatch";
import { setInitialsAction } from "@/redux/activeImg/activeImg.action";

export default function useInit() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInitialsAction());
  }, [dispatch]);
}
