import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  TextField
} from '@material-ui/core'

export default function useDialog({
  onConfirm,
  title,
  text,
  action,
  fields = []
}) {
  const [open, setOpen] = useState(false)
  const [formValues, setFormValues] = useState({})
  const [error, setError] = useState()

  const handleClose = () => setOpen(false)

  const handleChange = e =>
    setFormValues(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleConfirm = async () => {
    try {
      await onConfirm(formValues)
    } catch (err) {
      return setError(err)
    }

    setFormValues({})
    setError()
    handleClose()
  }

  const dialog = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {text && <DialogContentText>{text}</DialogContentText>}
        <form>
          {fields.map(field => (
            <TextField
              key={field.name}
              autoComplete="off"
              fullWidth
              onChange={handleChange}
              value={formValues[field.name] || ''}
              {...field}
            />
          ))}
        </form>
        {error && <FormHelperText error>{error.message}</FormHelperText>}
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          variant="contained"
          onClick={handleConfirm}
          color="primary"
        >
          {action}
        </Button>
      </DialogActions>
    </Dialog>
  )

  return [dialog, () => setOpen(true)]
}
