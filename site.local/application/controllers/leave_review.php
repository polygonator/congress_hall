<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Leave_review extends CI_Controller {
    
    function l_rev()
    {  
        $error = array('error'=>FALSE);
        $this->load->view('cap_page');
        $this->load->view('leave_review_page', $error);
        $this->load->view('basement_page');
    }

    function submit()
    {
        if((isset($_POST['leave'])) && $this->input->post('text') != "")
        {
            $this->load->model('leave_review_model');
            $this->leave_review_model->reque();
            redirect('review');
        }
        else
        {
            $error = array('error'=>TRUE);
            $this->load->view('cap_page');
            $this->load->view('leave_review_page', $error);
            $this->load->view('basement_page');
        }
    }
}
