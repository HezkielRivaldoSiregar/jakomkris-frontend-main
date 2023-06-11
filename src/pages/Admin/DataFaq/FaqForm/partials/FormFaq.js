import React from 'react';
import { Form } from 'react-bootstrap'
import QuillToolbar, { modules, formats } from "./QuillToolbar";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function FormFaq({getInputProps}){
  const contentProps = getInputProps('answer')
    return(
        <div className={'grid grid-cols-2 gap-x-4'}>
        <Form.Group className={'col-span-2'} controlId="question">
          <Form.Label>Pertanyaan</Form.Label>
          <Form.Control
            placeholder="Masukkan Pertanyaan"
            {...getInputProps('question')}
          />
        </Form.Group>

        <Form.Group className={'col-span-2'} controlId="answer">
        <Form.Label>Jawaban</Form.Label>
        <div>

          <QuillToolbar />
          <ReactQuill
            placeholder="Masukkan Jawaban"
            modules={modules}
            formats={formats}
            {...contentProps}
            onChange={(value) => {
              contentProps.onChange({
                target: {
                  id: 'answer',
                  value
                }
              })
            }}
          />
        </div>
      </Form.Group>

      </div>
    );
}

export default FormFaq
