import React from 'react';
import { Form } from 'react-bootstrap'

const disasterRiskOptions = [
  { meaning: '---', color: null },
  { meaning: 'Risiko Rendah', color: '#31AA75' },
  { meaning: 'Risiko Sedang', color: '#F7EA00' },
  { meaning: 'Risiko Tinggi', color: '#FF8E00' },
  { meaning: 'Risiko Sangat Tinggi', color: '#CF3333' },
]

function RisikoBencanaForm({ formValues, getInputProps }) {
    return (
      <div className={'grid grid-cols-3 gap-4'}>
        {
          formValues?.properties?.disasterRisks.map?.(
            (disasterRisk, index) => {
              const { alertLevel } = disasterRisk || {}
              return (
                <Form.Group
                  key={index}
                  controlId={`properties.disasterRisks.${index}.alertLevel`}
                >
                  <Form.Label className={'relative'}>
                    {disasterRisk.name}
                    <div
                      className={`absolute top-1 -right-5 w-[16px] h-[16px]`}
                      style={{
                        backgroundColor: alertLevel?.color,
                      }}
                    />
                  </Form.Label>

                  <Form.Control
                    as={'select'}
                    placeholder="Masukkan Alert Level"
                    data-with-object-value
                    onChange={getInputProps(
                      `properties.disasterRisks.${index}.alertLevel`).onChange}
                  >
                    {
                      disasterRiskOptions.map((disasterRiskOption) => {
                        const { meaning, color } = disasterRiskOption
                        const value = JSON.stringify(disasterRiskOption)
                        const isSelected = alertLevel?.meaning?.toLowerCase?.() ===
                          meaning?.toLowerCase?.()
                          || alertLevel?.color === color

                        return (
                          <option
                            key={color}
                            value={value}
                            selected={isSelected}
                          >
                            {meaning}
                          </option>
                        )
                      })
                    }
                  </Form.Control>
                </Form.Group>
              )
            })
        }
      </div>
    );
}

export default RisikoBencanaForm;
