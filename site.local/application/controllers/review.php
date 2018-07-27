<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Review extends CI_Controller {
    
    function rev()
    {  
         $this->load->model('review_model');
            
         $query = $this->review_model->pages();
         $this->load->view('cap_page');
         $this->load->view('review_page', $query);   
         $this->load->view('basement_page');
    }

}
