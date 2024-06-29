import React, { useEffect, useState } from "react";
import data from '../constants/data.json';
import { Table } from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/core/styles/Table.css';


interface CropData {
    Country: string;
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))": number | string;
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
    "Area Under Cultivation (UOM:Ha(Hectares))": number | string;
}
interface finalData {
    maxProduction: number;
    minProduction: number;
    maxCrop: string;
    minCrop: string;
}
interface TableData {
    Year: string,
    MaxCrop: string,
    MinCrop: string,
}


export default function Table1() {

    const [table, setTable] = useState<TableData[]>([])

    const result: { [key: string]: finalData } = {};

    useEffect(() => {
        {
            data.forEach((item: CropData) => {
                const year = item.Year
                const cropName = item['Crop Name']
                const cropProduction = item["Crop Production (UOM:t(Tonnes))"]

                /**Check if crop production string is empty */
                if (cropProduction === "") {
                    return;
                }

                /**convert cropProduction string into number */
                const production = typeof cropProduction === "string" ? parseFloat(cropProduction) : cropProduction;

                /**Check if there is this year already present in result object*/
                if (!result[year]) {
                    result[year] = {
                        maxProduction: production,
                        minProduction: production,
                        maxCrop: cropName,
                        minCrop: cropName
                    }
                } else {
                    if (production > result[year].maxProduction) {
                        result[year].maxProduction = production
                        result[year].maxCrop = cropName
                    }
                    if (production < result[year].minProduction) {
                        result[year].minProduction = production
                        result[year].minCrop = cropName
                    }
                }

            })
        }
        /**Transform the result object into an array */
        const table = Object.keys(result).map(year => ({
            Year: year,
            MaxCrop: result[year].maxCrop,
            MinCrop: result[year].minCrop,
        }));
        setTable(table);

    }, [])


    const rows = table.map((element: TableData) => (
        <Table.Tr key={element.Year}>
            <Table.Td>{element.Year}</Table.Td>
            <Table.Td>{element.MaxCrop}</Table.Td>
            <Table.Td>{element.MinCrop}</Table.Td>

        </Table.Tr>
    ));


    return (
        <div className="outer_container">
            <Table.ScrollContainer minWidth={500} className="container">
                <Table striped highlightOnHover withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Year</Table.Th>
                            <Table.Th>Crop with Maximum
                                Production in that Year</Table.Th>
                            <Table.Th>Crop with Minimum
                                Production in that Year</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </div>
    )
}


