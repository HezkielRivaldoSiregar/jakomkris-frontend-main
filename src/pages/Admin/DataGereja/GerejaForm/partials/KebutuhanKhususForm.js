import React from 'react';
import { Form } from 'react-bootstrap'

function KebutuhanKhususForm({ getInputProps }) {
    return (
      <div className={'grid grid-cols-2 gap-x-4'}>
        <Form.Group controlId="properties.trainingNeeds">
          <Form.Label>Kursus Yang Diperlukan</Form.Label>
          <Form.Control
            as={'textarea'}
            placeholder="Masukkan Kursus Yang Diperlukan"
            {...getInputProps('properties.trainingNeeds')}
          />
        </Form.Group>

        <Form.Group controlId="properties.increaseCapacity">
          <Form.Label>Yang diperlukan untuk peningkatan kapasitas
            gereja</Form.Label>
          <Form.Control
            as={'textarea'}
            placeholder="Masukkan Yang diperlukan untuk peningkatan kapasitas gereja"
            {...getInputProps('properties.increaseCapacity')}
          />
        </Form.Group>

        <Form.Group controlId="properties.competent">
          <Form.Label>Pihak yang berkompeten</Form.Label>
          <Form.Control
            as={'textarea'}
            placeholder="Masukkan Pihak yang berkompeten"
            {...getInputProps('properties.competent')}
          />
        </Form.Group>

        <Form.Group controlId="properties.preparednessTools">
          <Form.Label>Perangkat/peralatan kesiapsiagaan
            bencana</Form.Label>
          <Form.Control
            as={'textarea'}
            placeholder="Masukkan Perangkat/peralatan kesiapsiagaan bencana"
            {...getInputProps('properties.preparednessTools')}
          />
        </Form.Group>
      </div>
    );
}

export default KebutuhanKhususForm;
