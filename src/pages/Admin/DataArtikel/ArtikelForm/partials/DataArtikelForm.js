import React from 'react'
import { Form } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import QuillToolbar, { modules, formats } from "./QuillToolbar";
import 'react-quill/dist/quill.snow.css'

function DataArtikelForm ({ getInputProps }) {
  const contentProps = getInputProps('content')
  return (<div className={'grid grid-cols-1 gap-x-4'}>
      <Form.Group controlId="title">
        <Form.Label>Judul</Form.Label>
        <Form.Control
          placeholder="Masukkan Judul Artikel"
          {...getInputProps('title')}
        />
      </Form.Group>

      <Form.Group controlId="content">
        <Form.Label>Isi konten</Form.Label>
        <div>

          <QuillToolbar />
          <ReactQuill
            placeholder="Isi Konten..."
            modules={modules}
            formats={formats}
            {...contentProps}
            onChange={(value) => {
              contentProps.onChange({
                target: {
                  id: 'content',
                  value
                }
              })
            }}
          />
        </div>
      </Form.Group>

      <Form.Group controlId="image">
        <Form.Label>Gambar</Form.Label>
        <Form.Control
          placeholder="Masukkan Link Gambar"
          {...getInputProps('image')}
        />
      </Form.Group>

    </div>)
}

export default DataArtikelForm
