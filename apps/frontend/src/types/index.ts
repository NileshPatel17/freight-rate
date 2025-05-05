export type Quote = {
    shipment_id: number,
    origin_port: string,
    destination_port: string,
    container_type: string,
    carrier: string,
    fright_rate: number,
    effective_date: string
}

export interface FileData {
    headers: string[];
    rows: any[];
}
