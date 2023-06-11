import React from 'react';
import { Form } from 'react-bootstrap'

function DataUmumForm({ getInputProps }) {
    return (
      <div className={'grid grid-cols-2 gap-x-4'}>
        <Form.Group controlId="properties.name">
          <Form.Label>Nama Gereja</Form.Label>
          <Form.Control
            placeholder="Masukkan Nama Gereja"
            {...getInputProps('properties.name')}
          />
        </Form.Group>

        <Form.Group controlId="properties.province">
          <Form.Label>Provinsi</Form.Label>
          <Form.Control
            placeholder="Masukkan Provinsi"
            {...getInputProps('properties.province')}
          />
        </Form.Group>

        <Form.Group controlId="properties.address">
          <Form.Label>Alamat</Form.Label>
          <Form.Control
            as={'textarea'} placeholder="Masukkan Alamat"
            {...getInputProps('properties.address')}
          />
        </Form.Group>

        <Form.Group controlId="properties.congregation">
          <Form.Label>Jumlah Jemaat</Form.Label>
          <Form.Control
            type={'number'} placeholder="Masukkan Jumlah Jemaat"
            {...getInputProps('properties.congregation')}
          />
        </Form.Group>

        <Form.Group className={'col-span-2'} controlId="properties.churchImage">
          <Form.Label>URL Gambar</Form.Label>
          <Form.Control
            placeholder="Masukkan URL Gambar"
            {...getInputProps('properties.churchImage')}
          />
        </Form.Group>

        <h3 className={'text-xl text-slate-600 col-span-2'}>
          Geometry
        </h3>
        <Form.Group controlId="geometry.coordinates[0]">
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            placeholder="Masukkan Latitude"
            data-parser={'float'}
            {...getInputProps('geometry.coordinates[0]')}
          />
        </Form.Group>

        <Form.Group controlId="geometry.coordinates[1]">
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            placeholder="Masukkan Longitude"
            data-parser={'float'}
            {...getInputProps('geometry.coordinates[1]')}
          />
        </Form.Group>
      </div>
    );
}

export default DataUmumForm;
