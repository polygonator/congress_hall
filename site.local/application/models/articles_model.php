<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Articles_model extends CI_Model {

    function qu()
    {
        $query = $this->db->get('articles');
            
        foreach ($query->result() as $row)
        {
            echo $row->title.'&nbsp';
            echo $row->subject.'&nbsp';
            echo $row->text_length.'&nbsp';
            echo $row->date.'&nbsp';
            echo $row->id.'&nbsp';
        }
            
    }
    
}
