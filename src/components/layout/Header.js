import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Logo from './partials/Logo';
import Container from '../container/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, FormControl, FormGroup, InputLabel, makeStyles, Select } from '@material-ui/core';
// import { Form } from 'reactstrap';
import axios from 'axios'

const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool
}

const defaultProps = {
  navPosition: '',
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const Header = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  form,
  ...props
}) => {
  const classStyle = useStyles();
  const [isActive, setIsactive] = useState(false);

  const nav = useRef(null);
  const hamburger = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [themes, setThemes] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const [formData, setFormData] = useState({ name: '', lastName: '', email: '', proffesion: '', phone: '', establishment: '', theme: {} });


  async function loadThemes() {
    var result = await axios.get(`https://cims-server.herokuapp.com/theme`);
    setThemes(result.data['data']);
    setisLoading(false);
  }

  useEffect(() => {
    setisLoading(true);
    loadThemes();
    isActive && openMenu();
    document.addEventListener('keydown', keyPress);
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('keydown', keyPress);
      document.removeEventListener('click', clickOutside);
      closeMenu();
    };
  });



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log(formData)
    setOpen(false);
  };

  const openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    nav.current.style.maxHeight = nav.current.scrollHeight + 'px';
    setIsactive(true);
  }

  const closeMenu = () => {
    document.body.classList.remove('off-nav-is-active');
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  }

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  }

  const clickOutside = (e) => {
    if (!nav.current) return
    if (!isActive || nav.current.contains(e.target) || e.target === hamburger.current) return;
    closeMenu();
  }

  const classes = classNames(
    'site-header',
    bottomOuterDivider && 'has-bottom-divider',
    className
  );

  const triggerText = 'Open form';
  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log(event.target.name.value);
    console.log(event.target.email.value);
  };
  return (
    <header
      {...props}
      className={classes}
    >
      <div className="container">
        <div className={
          classNames(
            'site-header-inner',
            bottomDivider && 'has-bottom-divider'
          )}>
          <Logo />
          {!hideNav &&
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={
                  classNames(
                    'header-nav',
                    isActive && 'is-active'
                  )}>
                <div className="header-nav-inner">
                  <ul className={
                    classNames(
                      'list-reset text-xs',
                      navPosition && `header-nav-${navPosition}`
                    )}>

                    {/* {form ?
                      <li>
                        <Link to="/form" onClick={closeMenu}>Add Form</Link>
                      </li> : null} */}
                    <div>
                      {/* <Container triggerText={triggerText} onSubmit={handleClickOpen} /> */}
                      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        Open form dialog
                    </Button>

                      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
                        maxWidth={'md'} fullWidth>
                        <DialogTitle id="form-dialog-title" color='primary'
                          style={{ backgroundColor: '#651fff', color: '#FFFFFF' }}

                        >Subscribe</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            To subscribe to this website,
          </DialogContentText>

                          <div className='formstyle'>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="Name"
                              type="text"
                              size={'medium'}
                              onChange={e => setFormData({ ...formData, name: e.target.value })}

                            />
                            <Box m={2} />
                            <TextField
                              autoFocus
                              margin="dense"
                              id="lastName"
                              label="lastName"
                              type="text"
                              onChange={e => setFormData({ ...formData, lastName: e.target.value })}

                            />
                            <Box m={2} />

                            <TextField
                              autoFocus
                              margin="dense"
                              id="proffesion"
                              label="proffesion"
                              type="text"
                              onChange={e => setFormData({ ...formData, proffesion: e.target.value })}


                            />
                            <Box m={0} />
                            <TextField
                              autoFocus
                              margin="dense"
                              id="phone"
                              label="phone"
                              type="text"
                              onChange={e => setFormData({ ...formData, phone: e.target.value })}

                            />
                            <Box m={2} />
                            <TextField
                              autoFocus
                              margin="dense"
                              id="Etablisment"
                              label="Etablisment"
                              type="text"
                              onChange={e => setFormData({ ...formData, establishment: e.target.value })}

                            />
                            <FormControl className={classStyle.formControl}>
                              <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                              <Select
                                native
                                // value={state.age}
                                // onChange={handleChange}
                                inputProps={{
                                  name: 'age',
                                  id: 'age-native-simple',
                                }}
                              >
                                <option aria-label="None" value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                              </Select>
                            </FormControl>

                          </div >
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Cancel
          </Button>
                          <Button onClick={handleClose} color="primary">
                            Submit
          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>


                  </ul>
                  {!hideSignin &&
                    <ul
                      className="list-reset header-nav-right"
                    >
                      <li>
                        <Link to="#0" className="button button-primary button-wide-mobile button-sm" onClick={closeMenu}>Sign up</Link>
                      </li>
                    </ul>}
                </div>
              </nav>
            </>}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
