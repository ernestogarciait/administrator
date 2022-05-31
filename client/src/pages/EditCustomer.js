import React, { useState } from 'react';
import {
  DatePicker,
  TextareaAutosize,
  Box,
  Button, Container, TextField,
  Typography
} from '@material-ui/core';
import { Formik } from 'formik';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation} from 'react-router-dom';
import { firebaseCrear, firebaseEditar } from 'src/utils/FirebaseUtil';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import * as Yup from 'yup';

const EditCustomer = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const messageAction = (state.customer.id == '') ? "Crear Cliente" : "Editar Cliente";
  const screenAction = (state.customer.id == '') ? "C" : "M";


const countries = [
    { value: "ghana", label: "Ghana" },
    { value: "nigeria", label: "Nigeria" },
    { value: "kenya", label: "Kenya" },
    { value: "southAfrica", label: "South Africa" },
    { value: "unitedStates", label: "United States" },
    { value: "canada", label: "Canada" },
    { value: "germany", label: "Germany" }
  ];

  const [pickerItems, setPickerItems] = React.useState(countries);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleCreateItem = (item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  
  const crearCliente = (cliente) => {
    if (screenAction == "C") {
      firebaseCrear('clientes', cliente);
    } else {
      firebaseEditar('clientes', cliente)
    }
    navigate('/app/customers', { replace: true });
  }

  const inizialize = () => {
    if (state != null) {
      return {
        email: state.customer.email,
        phone: state.customer.phone,
        firstName: state.customer.firstName,
        lastName: state.customer.lastName,
        id: state.customer.id
      }
    }
  }
  const [selectedTeam, setSelectedTeam] = useState(null);
  return (
    <>
      <Helmet>
        <title>{messageAction}</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik

            initialValues={inizialize()}

            //initialValues={state.customer}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                firstName: Yup.string().max(255).required('First name is required'),
                phone: Yup.string().max(60),
                lastName: Yup.string().max(255).required('Last name is required')
              })
            }
            onSubmit={(objetocustomer) => {
              crearCliente(objetocustomer);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    {messageAction}
                  </Typography>
                </Box>
                

                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="First name"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Last name"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                />

      <TextField
        id="date"
        label="Birthday"
        type="date"
        defaultValue="2017-05-24"
        InputLabelProps={{
          shrink: true,
        }}
      />
        <TextField
          id="outlined-number"
          fullWidth
          margin="normal"
          label="Number int max number 10"
          type="number"
          InputProps={{ inputProps: { min: "0", max: "10", step: "1" } }}
          variant="outlined"
         />
      
         <TextField type="number"
          inputProps={{className:'digitsOnly'}}
          margin="normal"
          fullWidth
          floatingLabelText="mobileNumber"
          id={"mobileNumber"} name={"mobileNumber"}
        />


{/*<TextareaAutosize
  id="cmbcountries"
  options={countries}
  renderInput={params => (
    <TextField {...params} label="Type a Country" variant="outlined" />
  )}
  getOptionLabel={option => option.label}
  style={{ width: 270 }}
  value={selectedTeam}
  onChange={(_event, newTeam) => {
    setSelectedTeam(newTeam);
  }}
/>*/}




                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  label="Phone Address"
                  margin="normal"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="phone"
                  value={values.phone}
                  variant="outlined"
                />
               
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {screenAction == "C" ? "Crear" : "Editar"}
                  </Button>
                </Box>

              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default EditCustomer;
