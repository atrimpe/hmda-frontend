import React from 'react'
import { connect } from 'react-redux'
import Upload from '../components/UploadForm.jsx'
import { selectFile, triggerParse } from '../actions'
import detectFileEncoding from 'detect-file-encoding-and-language'

export function mapStateToProps(state) {
  const { uploading, file, errors } = state.app.upload || {
    uploading: false,
    file: null,
    errors: []
  }

  const filingPeriod = state.app.filingPeriod || null
  const parseErrors = state.app.parseErrors || {
    transmittalSheetErrors: [],
    larErrors: [],
  }
  const errorCount = parseErrors.transmittalSheetErrors.length + parseErrors.larErrors.length

  return {
    uploading,
    file,
    filingPeriod,
    errors,
    parseErrors: {...parseErrors, errorCount}
  }
}

function setAndParseFile(file) {
  return (dispatch, getState) => {
    // Check file encoding prior to performing other file validations
    detectFileEncoding(file).then((fileInfo) => {
      const encodingErrors = []

      if (fileInfo.encoding !== "UTF-8")
        encodingErrors.push(
          "The file you uploaded is not UTF-8 encoded. Please check your file and re-upload."
        )

      // Save client-side validation errors, whose presence will halt backend processing
      dispatch(selectFile(file, encodingErrors))

      // Submit file for backend parsing only if all client-side validations pass
      if (getState().app.upload.errors.length === 0) {
        dispatch(triggerParse(file))
      }
    }).catch(err => {
      // Save client-side validation errors
      dispatch(selectFile(file, [err.message]));
    })
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    setFile: (acceptedFiles, rejectedFiles) => {
      if (!acceptedFiles || !rejectedFiles) return
      let file = acceptedFiles[0] || rejectedFiles[0]
      if(!file) return
      dispatch(setAndParseFile(file))
    }
  }
}


const UploadButton = (props) => {
  const text = props.text || 'Upload file' 

  const handleSelection = (event) => {
    if (!event || !event.target.files) return
    props.setFile(event.target.files, [])
  }

  return (
    <>
      <input id='uploadFileInput' type='file' onChange={handleSelection} />
      <button
        id='uploadFileButton'
        type='button'
        onClick={() => document.getElementById('uploadFileInput').click()}
      >
        {text}
      </button>
    </>
  )
}


export const ConnectedUploadButton = connect(mapStateToProps, mapDispatchToProps)(UploadButton)
export default connect(mapStateToProps, mapDispatchToProps)(Upload)
