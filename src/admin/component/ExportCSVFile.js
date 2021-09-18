import React from 'react'
import { CSVLink } from 'react-csv'
import Button from 'react-bootstrap/Button';

export const ExportCSVFile = ({csvData, fileName}) => {
    const buttonStyle={
        float:"right"
      }
    return (
        <Button variant="warning" style={buttonStyle}>
            <CSVLink data={csvData} filename={fileName}>Export</CSVLink>
        </Button>
    )
}