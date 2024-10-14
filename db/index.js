import { supabase } from "@/lib/supabase";

const STOCK_LIST_SESSIONS_TABLE = "stock_list_sessions";
const OVERALL_STOCK_LIST = "stock_list";

const db = {
  getSetSessions: async () => {
    let { data: stockListSessions, error } = await supabase
      .from(STOCK_LIST_SESSIONS_TABLE)
      .select("*");

    if (error) {
      throw error;
    } else {
      return stockListSessions;
    }
  },
  createSetSession: async () => {
    const { data: sessionData, error } = await supabase
      .from(STOCK_LIST_SESSIONS_TABLE)
      .insert({})
      .select();
    if (error) {
      throw error;
    } else {
      return sessionData?.[0];
    }
  },
  saveSetList: async (stockList) => {
    const { data, error } = await supabase
      .from(OVERALL_STOCK_LIST)
      .insert(stockList)
      .select();
    if (error) {
      throw error;
    } else {
      return data;
    }
  },
};

export default db;
