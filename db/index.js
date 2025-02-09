import { supabase } from "@/lib/supabase";

const STOCK_LIST_SESSIONS_TABLE = "stock_list_sessions";
const OVERALL_STOCK_LIST = "stock_list";

const COMMON_STOCKS_TABLE = "common_stocks";
const COMMON_STOCKS_SESSION_TABLE = "common_stocks_session";

const db = {
  getCommonStocks: async () => {
    let { data, error } = await supabase.from(COMMON_STOCKS_TABLE).select("*");

    if (error) {
      throw error;
    } else {
      return data;
    }
  },
  saveCommonStocks: async (commonStocks) => {
    const { data, error } = await supabase
      .from(COMMON_STOCKS_TABLE)
      .insert(commonStocks)
      .select();
    if (error) {
      throw error;
    } else {
      return data;
    }
  },
  getLatestStockSession: async () => {
    let { data, error } = await supabase
      .from(COMMON_STOCKS_SESSION_TABLE)
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
      .from(COMMON_STOCKS_SESSION_TABLE)
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
      .from(COMMON_STOCKS_SESSION_TABLE)
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
