import React, { useEffect, useState } from "react";
import data from '../constants/data.json';
import { Table } from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/core/styles/Table.css';

interface AverageData {
    crop: string;
    averageYield: number;
    averageArea: number;
}

export default function Table2() {
    const [averageData, setAverageData] = useState<AverageData[]>([]);

    useEffect(() => {
        const cropsData: { [key: string]: { totalYield: number; totalArea: number; count: number } } = {};

        {
            data.forEach((item) => {
                const crop = item["Crop Name"];
                const yieldStr = item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"];
                const areaStr = item["Area Under Cultivation (UOM:Ha(Hectares))"];

                const yieldOfCrop = typeof yieldStr === "string" ? parseFloat(yieldStr) : yieldStr;
                const area = typeof areaStr === "string" ? parseFloat(areaStr) : areaStr;

                if (!cropsData[crop]) {
                    cropsData[crop] = { totalYield: 0, totalArea: 0, count: 0 }
                }
                cropsData[crop].totalYield += yieldOfCrop || 0;
                cropsData[crop].totalArea += area || 0;
                cropsData[crop].count += 1;

                const averages: AverageData[] = Object.keys(cropsData).map(crop => ({
                    crop,
                    averageYield: cropsData[crop].totalYield / cropsData[crop].count,
                    averageArea: cropsData[crop].totalArea / cropsData[crop].count,
                }));
                setAverageData(averages);
            })
        }
    }, [])

    const rows = averageData.map((element: AverageData) => (
        <Table.Tr key={element.crop}>
            <Table.Td>{element.crop}</Table.Td>
            <Table.Td>{element.averageYield.toFixed(3)}</Table.Td>
            <Table.Td>{element.averageArea.toFixed(3)}</Table.Td>
        </Table.Tr>
    ));

    return (
        <div className="outer_container">
            <Table.ScrollContainer minWidth={500} className="container">
                <Table striped highlightOnHover withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Crop</Table.Th>
                            <Table.Th>Average Yield of the
                                Crop between
                                1950-2020</Table.Th>
                            <Table.Th>Average Cultivation Area
                                of the Crop between
                                1950-2020</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </div>
    )
}