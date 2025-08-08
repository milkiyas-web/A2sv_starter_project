export interface Cycle {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  created_at: string;
  is_active: boolean;
}
export interface CreateCyclePayload {
  name: string;
  start_date: string;
  end_date: string;
}
export interface GetCyclesResponse {
  success: boolean;
  data: {
    cycles: Cycle[];
    total_count: number;
    page: number;
    limit: number;
  };
  message: string;
}
