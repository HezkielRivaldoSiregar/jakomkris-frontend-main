import React from 'react';
import { Form } from 'react-bootstrap'

function KesiapanGerejaFOrm({ getInputProps }) {
    return (
      <Form.Control
        id={'properties.disasterOccurs'}
        as={'select'}
        onChange={getInputProps('properties.disasterOccurs').onChange}
        value={getInputProps('properties.disasterOccurs').value}
      >
        {
          ['Sedikit siap', 'Siap', 'Tidak siap', 'Sangat siap'].map(
            (option, index) => {
              return (
                <option
                  key={index}
                  value={option}
                >
                  {option}
                </option>

              )
            },
          )
        }
      </Form.Control>
    );
}

export default KesiapanGerejaFOrm;
