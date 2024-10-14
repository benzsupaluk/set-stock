import { supabase } from "@/lib/supabase";

const STOCK_LIST_SESSIONS_TABLE = "stock_list_sessions";
const OVERALL_STOCK_LIST = "stock_list";

const db = {
  getLatestStockSession: async () => {
    let { data, error } = await supabase
      .from(STOCK_LIST_SESSIONS_TABLE)
      .select("*")
      .order("scraped_at", { ascending: false })
      .limit(1);

    if (error) {
      throw error;
    } else {
      return data?.[0];
    }
  },
  getAllStockSessions: async () => {
    let { data, error } = await supabase
      .from(STOCK_LIST_SESSIONS_TABLE)
      .select("*")
      .order("scraped_at", { ascending: false });

    if (error) {
      throw error;
    } else {
      return data;
    }
  },
  getSetStockBySessionID: async (session_id) => {
    let { data, error } = await supabase
      .from(OVERALL_STOCK_LIST)
      .select("*")
      .eq("session_id", session_id);

    if (error) {
      throw error;
    } else {
      return data;
    }
  },
  createSetStockSession: async () => {
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
  saveSetStockList: async (stockList) => {
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
