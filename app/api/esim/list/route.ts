import { NextRequest } from "next/server";
import {countryData} from "../../countryData";
export async function GET(request: NextRequest) {
    const data = countryData;
    data.map((item) => {
        item.fromPrice = item.prices.sort((a, b) => a.price - b.price)[0].price;
        item.name = item.countryName;
    })
    return Response.json(data);
}