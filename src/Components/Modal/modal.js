import React, { useState, useEffect } from 'react';

import {
    Modal, ModalBody, ModalHeader,
    Button, Label, FormGroup, Col
} from 'reactstrap';
import { AvForm, AvGroup, AvField, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import moment from 'moment';

import styles from './modal.scss';

const CustomModal = (props) => {
    const [modal, setModal] = useState(false);
    const [periodicModal, setPeriodicModal] = useState(false);

    const [form, setForm] = useState({
        subject: "",
        startdate: moment().format("yyyy-MM-DD"),
        starttime: moment().format("HH:mm"),
        enddate: moment().format("yyyy-MM-DD"),
        endtime: moment().add('30', 'minutes').format("HH:mm"),
        repeat: false
    })

    useEffect(() => {
        setModal(props.isOpen)
    }, [props.isOpen])

    const toggle = () => {
        props.sendModalValueToParent(!modal)
        setModal(!modal)
    };

    const periodicModalToggle = () => {
        setPeriodicModal(!periodicModal)
    }

    const onHandleSubmit = (event, values) => {
        setForm({
            "subject": values.subject,
            "startdate": values.startdate,
            "starttime": values.starttime,
            "enddate": values.enddate,
            "endtime": values.endtime,
        })

        console.log("Form: ", form);
    }

    const onHandleRepeatChange = (event) => {
        console.log("onHandleRepeatChange", event.target.checked)
        setForm({
            repeat: event.target.checked,
        })
        setPeriodicModal(event.target.checked)
    }

    const onHandleChange = (event) => {
        console.log("onHandleChange: ", event.target)
        const {name, value} = event.target;

        setForm({
            ...form,
            [name]: value
        })
    }

    return (
        <React.Fragment>
        <Modal isOpen={modal}
            size="lg">
            <ModalHeader toggle={toggle}>Join Meeting</ModalHeader>
            <ModalBody>
                <AvForm onValidSubmit={onHandleSubmit}>
                    <AvGroup>
                        <Label>Subject</Label>
                        <AvField name="subject"
                            placeholder="Subject"
                            value={form.subject}
                            type="text"
                            onChange={onHandleChange}
                            validate={{
                                required: {value: true, errorMessage: "Please provide subject"}
                            }} />
                    </AvGroup>

                    <AvGroup row>
                        <Label lg={3}>Start Date/Time</Label>
                        <Col lg={5}>
                            <AvField name="startdate"
                                type="date"
                                value={form.startdate}
                                min={moment().format("yyyy-MM-DD")}
                                onChange={onHandleChange}
                                validate={{
                                    required: { value: true, errorMessage: "Please select date"}
                                }}
                            />
                        </Col>
                        <Col sm={4}>
                            <AvField name="starttime"
                                type="time"
                                value={form.starttime}
                            />
                        </Col>
                    </AvGroup>

                    <AvGroup row>
                        <Label lg={3}>End Date/Time</Label>
                        <Col lg={5}>
                            <AvField name="enddate"
                                type="date"
                                value={form.enddate}
                            />
                        </Col>
                        <Col sm={4}>
                            <AvField name="endtime"
                                type="time"
                                value={form.endtime}
                                min={moment().format("HH:mm")}
                                onChange={onHandleChange}
                                validate={{
                                    required: { value: true, errorMessage: "Please provide end time"}
                                }}
                            />
                        </Col>
                    </AvGroup>


                    <AvGroup row>
                        <Label lg={3}>Repeat</Label>
                        <Col lg={5}>
                            <AvCheckboxGroup inline name="repeatGroup">
                                <AvCheckbox name="repeat" 
                                            value={form.repeat}
                                            onClick={onHandleRepeatChange}
                                            />
                            </AvCheckboxGroup>                    
                        </Col>
                    </AvGroup>

                    <FormGroup className={styles.modalButtons}>
                        <Button>Submit</Button>
                        <Button color="danger" onClick={toggle}>Cancel</Button>
                    </FormGroup>
                </AvForm>
            </ModalBody>
        </Modal>

        <Modal isOpen={periodicModal}>
            <ModalHeader toggle={periodicModalToggle}>Periodic Meeting</ModalHeader>
        </Modal>
        </React.Fragment>
    )
}

export default CustomModal;