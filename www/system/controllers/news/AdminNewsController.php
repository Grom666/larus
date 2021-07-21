<?php

class AdminNewsController extends AdminController {
    public function __construct() {
        parent::__construct();
        $this->categories    = array();
        $this->structure     = array();
        $this->id            = $this->get['id'];
        $this->cid           = $this->get['cid'];
        $this->act           = $this->get['act'];
        $this->per_page      = 20;
        $this->start         = 0;
        $this->num_pages     = 1;
    }

    public function SetPlugins(){
/*        $this->js[]   = HTML_PLUGINS_DIR.'cleeditor/jquery.cleditor.min.js';
        $this->js[]   = HTML_PLUGINS_DIR.'cleeditor/jquery.cleditor.rfm.js';
        $this->css[]  = HTML_PLUGINS_DIR.'cleeditor/jquery.cleditor.css';*/
        $this->js[]   = HTML_PLUGINS_DIR.'tinymce/tinymce.min.js';
        $this->js[]   = HTML_PLUGINS_DIR.'fancybox/jquery.fancybox.js';
        $this->js[]   = HTML_PLUGINS_DIR.'fancybox/jquery.fancybox.pack.js';
        $this->js[]   = HTML_CONTROLLERS_DIR.'news/action.js';
        $this->js[]   = HTML_PLUGINS_DIR.'ajaxupload.3.5.js';

        $this->css[]  = HTML_PLUGINS_DIR.'fancybox/jquery.fancybox.css';

    }

    public function SaveFields(){
        foreach ($this->post as $k=>$p){
            if ($k == 'save-fields') continue;
            $this->config->set($k,$p);
        }
        $this->Head("?c=news&act=fields");
    }
    public function SaveSettings(){
        foreach ($this->post as $k=>$p){
            if ($k == 'save-settings') continue;
            $this->config->set($k,$p);
        }
        $this->Head("?c=news&act=settings");
    }
    public function SaveCategory(){
        $title            = $this->db->input($this->post['c_title']);
        $desc             = $this->db->input($this->post['c_desc']);
        $desc2            = $this->db->input($this->post['c_desc2']);
        $parent           = $this->db->input($this->post['parent']);
        $alias            = ($this->post['alias']!=='')?$this->post['alias']:$this->func->TranslitURL($title);
        $template         = $this->db->input($this->post['template']);
        $publ             = $this->post['publ'];
        $meta_desc        = $this->db->input($this->post['meta_description']);
        $meta_keywords    = $this->db->input($this->post['meta_keywords']);
        $delete_image     = $this->post['delete_image'];
        $old_image        = $this->post['old_image'];

        $sql = "SELECT * FROM `".db_pref."news_c` WHERE `ALIAS`='$alias'";
        if ($this->act!=='new_c'){
            $sql .= " AND ID <> $this->cid";
        }
        $query = $this->db->query($sql);
        if ($this->db->num_rows($query) == 0){
            $upload_path = UPLOAD_IMAGES_DIR.'news/';
            $image = Func::getInstance()->UploadFile($_FILES["image"]['name'],$_FILES["image"]['tmp_name'], $upload_path);

            if ($this->act == 'new_c'){
                $sql = "
                    INSERT INTO `".db_pref."news_c` (
                    `PARENT`,`TITLE`, `DESC`, `DESC2`, `ALIAS`, `META_DESC`,`META_KEYWORDS`, `PUBLIC`,`TEMPLATE`, `POSITION`, `IMAGE`)
                    VALUES
                    ('$parent','$title','$desc','$desc2', '$alias','$meta_desc','$meta_keywords','$publ','$template','99999','$image')";
                $query = $this->db->query($sql);
                $this->cid = $this->db->last_id();
            }else{
                if ($image!=='') {
                    $img_upd = ", `IMAGE` = '$image'";
                    if (!is_dir($old_image) && file_exists($old_image)){  // если есть новое изображение, то удаляем прежнее
                        unlink($old_image);
                    }
                }
                if ($delete_image) {
                    $img_upd = ", `IMAGE` = ''";
                    if (file_exists($old_image) && file_exists($old_image)){
                        unlink($old_image);
                    }
                }
                $sql = "UPDATE `".db_pref."news_c` SET
                `PARENT` = '$parent',
                `TITLE` = '$title',
                `DESC` = '$desc',
                `DESC2` = '$desc2',
                `ALIAS` = '$alias',
                `META_DESC` = '$meta_desc',
                `META_KEYWORDS` = '$meta_keywords',
                `PUBLIC` = '$publ',
                `TEMPLATE` = '$template'
                 $img_upd
                 WHERE `ID` = $this->cid";
                $query = $this->db->query($sql);
            }
            $this->Head("?c=news&cid=$this->cid");
        } else {
            $this->session['alert'] = 'Такой алиас уже существует';
        }
    }

    public function SaveItem(){
        $parents = $this->post['parents'];
        if (count($parents)==1){
            $parent = ','.$parents[0].',';
        } else {
            foreach ($parents as $k=>$p){
                if ($k==0) $parent = ',';
                $parent .= $p.',';
            }
        }

        $tag = trim($this->post['tags']);
        if ($tag!==''){
            $temp = explode(",",$tag);
            foreach ($temp as $t){
                if (trim($t)!==''){
                    $tags[]=trim($t);
                }
            }
            foreach ($tags as $k=>$t){
                if ($k==0)  $tags_str = ',';
                $tags_str .=$t.",";
            }
        }

        $alias = ($this->post['alias']!=='')?$this->post['alias']:Func::getInstance()->TranslitURL($this->post['title']);
        $params = array(
            'PARENT' => $parent,
            'TITLE' => $this->post['title'],
            'ALIAS' => $alias,
            //'SHORT_CONTENT' => $this->post['short_content'],
            'CONTENT' => $this->post['content'],
            'META_TITLE' => $this->post['meta_title'],
            'META_DESC' => $this->post['meta_description'],
            'META_KEYWORDS' => $this->post['meta_keywords'],
            //'COMMENTS' => $this->post['comments'],
            'COMMENTS' => 0,
            'PUBLIC' => $this->post['publ'],
            'TEMPLATE' => $this->post['template'],
            'TAGS' => $tags_str,
            'DATE_PUBL' => strtotime($this->post['date_publ']),
            'DATE_EDIT' => strtotime($this->post['date_edit']),
        );

        $sql = "SELECT * FROM `".db_pref."news_i` WHERE `ALIAS`='$alias'";
        if (isset($this->id)){
            $sql .= " AND ID <> $this->id";
        }
        //if (count($this->db->select($sql)) == 0){ // если такого алиаса нет
            if ($this->act == 'new'){
                $this->db->insert('agcms_news_i', $params);
                $this->id = $this->db->last_id();
            }else{
                $this->db->update('agcms_news_i', $params, "ID = " . $this->id);
            }

        if ($this->post['blog'] == 1){
            $params = array(
                'PARENT' => $parent,
                'TITLE' => $this->post['title'],
                'ALIAS' => $alias,
                'SHORT_CONTENT' => $this->post['content'],
                'CONTENT' => $this->post['content'],
                'META_TITLE' => $this->post['meta_title'],
                'META_DESC' => $this->post['meta_description'],
                'META_KEYWORDS' => $this->post['meta_keywords'],
                'COMMENTS' => 1,
                'PUBLIC' => 1,
                'TEMPLATE' => $this->post['template'],
                'DATE_PUBL' => strtotime($this->post['date']),
                'DATE_EDIT' => strtotime($this->post['date']),
                'TAGS' => $tags_str,
            );
            if (isset($this->id)){
                $sql = "SELECT * FROM `".db_pref."news_i` WHERE ID = " . $this->id;
                if ($rs = $this->db->select($sql, array('single_array' => true))){
                    if ($rs['IMAGES'] !== ''){
                        $imgs = explode(',', $rs['IMAGES']);
                        foreach ($imgs as $img){
                            copy(UPLOAD_IMAGES_DIR . 'news/' . $img, UPLOAD_IMAGES_DIR . 'blog/' . $img);
                        }
                    }
                    $params['IMAGES'] = $rs['IMAGES'];
                }
            }

            $this->db->insert('agcms_blog_i', $params);
        }

            $this->Head("?c=news&cid=".$parents[0]."&id=$this->id");
      /*  } else {
            $this->session['alert'] = 'Такой алиас уже существует';
        }*/
    }

    public function getCategories($parent = false){
        $categories = array();
        $sql = "SELECT * FROM `".db_pref."news_c` ORDER BY `ID`";
        $query = $this->db->query($sql);
        for ($i=0; $i < $this->db->num_rows($query); $i++) {
            $row = $this->db->fetch_array($query);
            $categories[] = $row;
        }
        return $categories;
    }

    public function getPagination2($parent = false){
        $where = '';
        if ($parent){
            $where = "WHERE `PARENT` LIKE '%,$parent,%'";
        }
        $sql = "SELECT * FROM `".db_pref."news_i` $where";
        $query = $this->db->query($sql);
        $total = $this->db->num_rows($query);
        $this->num_pages = ceil($total / $this->per_page);
        $this->total = $total;
        $cur_page = 1;
        if (isset($_GET['p']) && $_GET['p'] > 0) {
            $cur_page = $_GET['p'];
        }
        $this->start = ($cur_page - 1) * $this->per_page;
    }

    public function getItems($parent = false, $start, $count){
        $items = array();
        $where = '';
        if ($count > 0){
            $limit = "LIMIT $start, $count";
        }
        if ($parent){
            $where = "WHERE `PARENT` LIKE '%,$parent,%'";
        }

        $sql = "SELECT * FROM `".db_pref."news_i` $where ORDER BY `ID` DESC $limit";
        $query = $this->db->query($sql);
        for ($i=0; $i < $this->db->num_rows($query); $i++) {
            $row = $this->db->fetch_array($query);
            $row["DATE_PUBL"] = $this->DateFormat($row["DATE_PUBL"]);
            $row["DATE_EDIT"] = $this->DateFormat($row["DATE_EDIT"]);
            $items[] = $row;
        }
        return $items;
    }
    public function getCategory($cid){
        $row = array();
        $sql = "SELECT * FROM `".db_pref."news_c` WHERE `ID`=$cid LIMIT 1";
        $query = $this->db->query($sql);
        if ($this->db->num_rows($query)>0){
            $row = $this->db->fetch_array($query);
            $row['DATE_PUBL'] = $this->DateFormat($row["DATE_PUBL"]);
            $row['DATE_EDIT'] = $this->DateFormat($row["DATE_EDIT"]);
            if ($row['IMAGE']!==''){
                $row['NEW_IMAGE'] = Func::getInstance()->GetImage(UPLOAD_IMAGES_DIR.'news/'.$row['IMAGE'], 50,50,'','news');
            }
        }
        return $row;
    }
    public function getItem($id){
        $sql = "SELECT i.*, c.ID AS CID, c.TITLE AS CAT_NAME, c.ALIAS AS CAT_ALIAS FROM `".db_pref."news_i` i LEFT JOIN `".db_pref."news_c` c ON i.PARENT=c.ID WHERE i.`ID`=$id LIMIT 1";
        $query = $this->db->query($sql);
        $row = $this->db->fetch_array($query);
        $row["DATE_PUBL"] = $this->DateFormat2($row["DATE_PUBL"]);
        $row["DATE_EDIT"] = $this->DateFormat2($row["DATE_EDIT"]);
        $row['PARENTS'] = explode(",", $row['PARENT']);
        $row['PARENTS'] = array_filter($row['PARENTS']);
        sort($row['PARENTS']);
        $tags = $row['TAGS'];
        if ($tags!==''){
            if (mb_substr($tags, 0, 1)==','){
                $tags = mb_substr($tags,1);
            }
            if (mb_substr($tags,-1)==','){
                $tags = substr($tags,0,-1);
            }
        }
        $row['TAGS'] = $tags;
        $images = array();
        $new_images = array();
        if ($row['IMAGES']!==''){
            $images = explode(",", $row['IMAGES']);
            foreach ($images as $img){
                $new_images[] = $this->func->GetImage(UPLOAD_IMAGES_DIR.'news/'.$img, 100,100,'','news');
            }
        }
        $row['IMAGES'] = $images;
        $row['NEW_IMAGES'] = $new_images;
        $files = array();
        if ($row['FILES']!==''){
            $files = unserialize($row['FILES']);
        }
        $row['FILES'] = $files;
        return $row;
    }
    public function ShowMenu(){
        $this->assign(array(
            'categories' => $this->structure,
        ));
        $menu = $this->fetch('menu2.tpl');
        $this->assign(array(
            'menu' => $menu,
        ));
        $this->widget_left_top .=$this->fetch('menu.tpl');
    }

    public function ShowItems($cid = null){
/*        $this->getPagination2($cid,$this->start,$this->per_page);
        $items =  $this->getItems($cid,$this->start,$this->per_page);*/
        $url = '';
        $where = '';
        if ($cid){
            $where = "WHERE `PARENT` LIKE '%,$cid,%'";
            $url .= '&cid='.$cid;
        }
        $sql = "SELECT * FROM `".db_pref."news_i` $where ORDER BY DATE_EDIT DESC";
        $params = array(
            'sql' => $sql,
            'per_page' => 20,
            'current_page' => $this->get['page'],
            'link' => '?c=news'.$url,
            'get_name' => 'page',
        );
        $result = $this->getPagination($params);
        $query = $result['query'];
        for ($i=0; $i < $this->db->num_rows($query); $i++) {
            $row = $this->db->fetch_array($query);
            $row["DATE_PUBL"] = $this->DateFormat2($row["DATE_PUBL"]);
            $row["DATE_EDIT"] = $this->DateFormat2($row["DATE_EDIT"]);
            $items[] = $row;
        }
        $num_pages = $result['num_pages'];
        $pagination = $result['pagination'];
        $total = $result['total'];
        $start = $result['start'];
        $this->assign(array(
            'items'           => $items,
            'category_id'     => $this->cid,
            'items_count'     => count($items),
            'total'           => $total,
            'start'           => $start,
            'pagination'      => $pagination,
        ));
        $this->content = $this->SetTemplate('items.tpl');
    }

    public function ShowNewCat(){
        $this->assign(array(
            'templates'      => $this->func->getTemplates($this->templates_dir.'news/list/'),
            'categories'     => $this->categories,
            'new'            => true,
        ));
        $this->content = $this->SetTemplate('cat.tpl');
    }
    public function ShowNewItem(){
        $this->assign(array(
            'templates' => $this->func->getTemplates($this->templates_dir.'news/single/'),
            'categories' => $this->structure,
            'new'       => true,
        ));
        $this->content = $this->SetTemplate('item.tpl');
    }
    public function DeleteCategory($id){
        $sql = "SELECT * FROM `".db_pref."news_i` WHERE `PARENT` LIKE '%,$id,%'";
        $query = $this->db->query($sql);
        if ($this->db->num_rows($query) == 0){
            $sql = "DELETE FROM `".db_pref."news_c` WHERE `ID`=$id";
            $query = $this->db->query($sql);
            $this->Head('?c=news');
        } else {
            $_SESSION['alert'] = 'Сначала удалите материалы из этой категории!';
            $this->Head("?c=news&cid=$id");
        }
    }
    public function DeleteItem($id){
        $sql = "SELECT * FROM `".db_pref."news_i` WHERE `ID`=$id LIMIT 1";
        $query = $this->db->query($sql);
        $row = $this->db->fetch_array($query);
        if ($row['IMAGES']!==''){
            $images = explode(",", $row['IMAGES']);
            foreach ($images as $img){
                if (file_exists(UPLOAD_IMAGES_DIR.'news/'.$img)){
                    unlink(UPLOAD_IMAGES_DIR.'news/'.$img);
                }
            }
        }
        $sql = "DELETE FROM `".db_pref."news_i` WHERE `ID`=$id";
        $query = $this->db->query($sql);
    }
    public function ShowCategory($row){
        $this->assign(array(
            'category_id'              => $this->cid,
            'category_title'           => isset($title)    ?   $title    :    $row['TITLE'],
            'category_desc'            => isset($desc)     ?   $desc     :    $row['DESC'],
            'category_desc2'            => isset($desc2)     ?   $desc2     :    $row['DESC2'],
            'category_alias'           => isset($alias)    ?   $alias    :    $row['ALIAS'],
            'category_template'        => isset($template) ?   $template :    $row['TEMPLATE'],
            'category_parent'          => isset($parent)   ?   $parent   :    $row['PARENT'],
            'category_publ'            => isset($publ)     ?   $publ     :    $row['PUBLIC'],
            'category_meta_desc'       => isset($meta_desc)     ?   $meta_desc     :    $row['META_DESC'],
            'category_meta_keywords'   => isset($meta_keywords)     ?   $meta_keywords     :    $row['META_KEYWORDS'],
            'category_new_image'       => $row['NEW_IMAGE'],
            'category_image'           => UPLOAD_IMAGES_DIR.'news/'.$row['IMAGE'],
            'category'                 => $row,
            'categories'               => $this->categories,
            'templates'                => Func::getInstance()->getTemplates($this->templates_dir.'news/list/'),
        ));
        $this->content = $this->SetTemplate('cat.tpl');
    }
    public function ShowItem($row){
        $this->assign(array(
            'item'                     => $row,
            'item_id'                  => $row['ID'],
            'categories'               => $this->structure,
            'templates'                => Func::getInstance()->getTemplates($this->templates_dir.'news/single/'),
            'cid'                      => $row['CID'],
            'c_name'                   => $row['CAT_NAME'],
            'c_alias'                  => $row['CAT_ALIAS'],
            'item_title'               => $row['TITLE'],
            'item_alias'               => $row['ALIAS'],
            'item_parents'             => $row['PARENTS'],
            'item_template'            => $row['TEMPLATE'],
            'short_item_content'       => $row['SHORT_CONTENT'],
            'item_content'             => htmlspecialchars($row['CONTENT']),
            'item_publ'                => $row['PUBLIC'],
            'item_comments'            => $row['COMMENTS'],
            'item_meta_title'          => $row['META_TITLE'],
            'item_meta_desc'           => $row['META_DESC'],
            'item_meta_keywords'       => $row['META_KEYWORDS'],
            'item_tags'                => $row['TAGS'],
            'item_source'              => $row['SOURCE'],
            'new_images'               => $row['NEW_IMAGES'],
            'images'                   => $row['IMAGES'],
            'files'                    => $row['FILES'],
            'skin'                     => $row['SKIN'],
            'item_other1'              => $row['OTHER1'],
            'item_other2'              => $row['OTHER2'],
            'item_other3'              => $row['OTHER3'],
            'item_other4'              => $row['OTHER4'],
            'item_other5'              => $row['OTHER5'],
            'item_other6'              => $row['OTHER6'],
            'item_other7'              => $row['OTHER7'],
            'item_other8'              => $row['OTHER8'],
            'item_other9'              => $row['OTHER9'],
            'item_other10'             => $row['OTHER10'],
            'item_file1'               => $row['FILE1'],
            'item_file2'               => $row['FILE2'],
            'item_file3'               => $row['FILE3'],
            'item_file1_name'          => $row['FILE1_NAME'],
            'item_file2_name'          => $row['FILE2_NAME'],
            'item_file3_name'          => $row['FILE3_NAME'],
        ));
        $this->content = $this->SetTemplate('item.tpl');
    }

    public function getSiteMap(){
        $sql = "SELECT ALIAS FROM `".db_pref."news_i`  WHERE `PUBLIC`=1 ORDER BY `DATE_PUBL` DESC";
        $result = $this->db->query($sql);
        $return = array();
        if ($this->db->num_rows($result)){
            for ($i = 0; $i < $this->db->num_rows($result); $i++){
                $row = $this->db->fetch_array($result);
                $return[]  = array(
                    'loc'           => $this->site_url . 'news/' . $row['ALIAS'] .'/',
                    'changefreq'    => 'weekly',
                    'priority'      => '1',
                );
            }
        }
        return $return;
    }

    public function Index(){
        $this->SetPlugins();
        $this->page_title = 'Каталог';
        if (isset($this->post['c_title']) && trim($this->post['c_title'])!==''){
            $this->SaveCategory();
        }
        /*добавление/редактирование материала*/
        if (isset($this->post['title']) && trim($this->post['title'])!==''){
            $this->SaveItem();
        }
        if (isset($this->post['save-fields'])){
            $this->SaveFields();
        }
        if (isset($this->post['save-settings'])){
            $this->SaveSettings();
        }
        $this->categories = $this->getCategories();
        if(count($this->categories) == 0 && !isset($this->act)){
            $this->head('?c=news&act=new_c');
        }
        $this->structure = Func::getInstance()->getStructure($this->categories);
        $this->ShowMenu();


        if ($this->act == 'fields'){
            $this->content = $this->SetTemplate('item-fields-settings.tpl');
        }
        elseif ($this->act == 'settings'){
            $this->assign(array(
                'templates_comment_form'      => $this->func->getTemplates($this->templates_dir.'comments/form/'),
                'templates_comment_view'      => $this->func->getTemplates($this->templates_dir.'comments/view/'),
            ));
            $this->content = $this->SetTemplate('settings.tpl');
        }
        elseif ($this->act == 'new_c'){
            $this->ShowNewCat();
        }
        elseif ($this->act == 'new'){
            $this->ShowNewItem();
        }
        elseif ($this->act == 'del'){
            $this->DeleteCategory($this->cid);

        }
        elseif ($this->act == 'del-item'){
            $this->DeleteItem($this->id);
            $this->Head("?c=news&cid=$this->cid");
        }
        elseif (!isset($this->act) && isset($this->cid) && !isset($this->id)){
            $this->ShowItems($this->cid);
        }
        elseif ($this->act == 'edit' && isset($this->cid) && $this->cid!==''){
            $row = $this->getCategory($this->cid);
            $this->ShowCategory($row);
        }
        elseif (isset($this->id)){
            $row = $this->getItem($this->id);
            $this->ShowItem($row);
        }
        else {
            $this->ShowItems();
        }
        return $this->content;
    }




}
?>