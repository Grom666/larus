<?php /* Smarty version Smarty-3.1.21-dev, created on 2021-10-18 13:56:20
         compiled from "D:\data\domains\provoda\www\system\controllers\news\tpl\items.tpl" */ ?>
<?php /*%%SmartyHeaderCode:1369608899616d52d45ee050-46308064%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '6285330b71650f27682614b3d1fa673470d32c02' => 
    array (
      0 => 'D:\\data\\domains\\provoda\\www\\system\\controllers\\news\\tpl\\items.tpl',
      1 => 1626993043,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1369608899616d52d45ee050-46308064',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'items' => 0,
    'pagination' => 0,
    'start' => 0,
    'items_count' => 0,
    'total' => 0,
    'category_id' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.21-dev',
  'unifunc' => 'content_616d52d460d468_64717184',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_616d52d460d468_64717184')) {function content_616d52d460d468_64717184($_smarty_tpl) {?>

<?php if ($_smarty_tpl->tpl_vars['items']->value) {?>
    <div class="col-sm-7">
        <?php echo $_smarty_tpl->tpl_vars['pagination']->value;?>

    </div>
    <div class="<?php if ($_smarty_tpl->tpl_vars['pagination']->value) {?>col-sm-5<?php } else { ?>col-sm-12<?php }?> text-right">
        <p style="margin-top: 10px;">Показано новостей: <?php echo $_smarty_tpl->tpl_vars['start']->value;?>
-<?php echo $_smarty_tpl->tpl_vars['items_count']->value+$_smarty_tpl->tpl_vars['start']->value-1;?>
 из <?php echo $_smarty_tpl->tpl_vars['total']->value;?>
</p>
    </div>
    <table class="table table-striped">
        <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Изменено</th>
            <th>Статус</th>
            <th style="width: 144px;">Действия</th>
        </tr>
    <?php if (isset($_smarty_tpl->tpl_vars['smarty']->value['section']['i'])) unset($_smarty_tpl->tpl_vars['smarty']->value['section']['i']);
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['name'] = 'i';
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['loop'] = is_array($_loop=$_smarty_tpl->tpl_vars['items']->value) ? count($_loop) : max(0, (int) $_loop); unset($_loop);
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['show'] = true;
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['max'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['loop'];
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['step'] = 1;
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['start'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['step'] > 0 ? 0 : $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['loop']-1;
if ($_smarty_tpl->tpl_vars['smarty']->value['section']['i']['show']) {
    $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['total'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['loop'];
    if ($_smarty_tpl->tpl_vars['smarty']->value['section']['i']['total'] == 0)
        $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['show'] = false;
} else
    $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['total'] = 0;
if ($_smarty_tpl->tpl_vars['smarty']->value['section']['i']['show']):

            for ($_smarty_tpl->tpl_vars['smarty']->value['section']['i']['index'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['start'], $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['iteration'] = 1;
                 $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['iteration'] <= $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['total'];
                 $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['index'] += $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['step'], $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['iteration']++):
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['rownum'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['iteration'];
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['index_prev'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['index'] - $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['step'];
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['index_next'] = $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['index'] + $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['step'];
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['first']      = ($_smarty_tpl->tpl_vars['smarty']->value['section']['i']['iteration'] == 1);
$_smarty_tpl->tpl_vars['smarty']->value['section']['i']['last']       = ($_smarty_tpl->tpl_vars['smarty']->value['section']['i']['iteration'] == $_smarty_tpl->tpl_vars['smarty']->value['section']['i']['total']);
?>
        <tr>
            <td><?php echo $_smarty_tpl->tpl_vars['items']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['ID'];?>
</td>
            <td><a href="?c=news&id=<?php echo $_smarty_tpl->tpl_vars['items']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['ID'];?>
"><?php echo $_smarty_tpl->tpl_vars['items']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['TITLE'];?>
</a></td>
            <td><?php echo $_smarty_tpl->tpl_vars['items']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['DATE_EDIT'];?>
</td>
            <td>
                <?php if ($_smarty_tpl->tpl_vars['items']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['PUBLIC']==1) {?>
                    <span class="glyphicon glyphicon-ok text-success"></span>
                <?php } else { ?>
                    <span class="glyphicon glyphicon-minus text-danger"></span>
                <?php }?>
            </td>
            <td>
                <a target="_blank" class="btn btn-primary btn-mini" data-original-title="Перейти к материалу" title="" data-toggle="tooltip" href="/news/<?php echo $_smarty_tpl->tpl_vars['items']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['ALIAS'];?>
">
                    <span class="glyphicon glyphicon-share-alt"></span>
                </a>
                <a class="btn btn-success btn-mini" data-original-title="Редактировать материал" title="" data-toggle="tooltip" href="?c=news&id=<?php echo $_smarty_tpl->tpl_vars['items']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['ID'];?>
">
                    <span class="glyphicon glyphicon-pencil"></span>
                </a>
                <a class="btn btn-danger btn-mini del-item" data-original-title="Материал будет полностью удален" title="" data-toggle="tooltip" href="?c=news&act=del-item&id=<?php echo $_smarty_tpl->tpl_vars['items']->value[$_smarty_tpl->getVariable('smarty')->value['section']['i']['index']]['ID'];?>
&cid=<?php echo $_smarty_tpl->tpl_vars['category_id']->value;?>
">
                    <span class="glyphicon glyphicon-remove"></span>
                </a>
            </td>
        </tr>
    <?php endfor; endif; ?>
    </table>
    <div class="col-sm-7">
        <?php echo $_smarty_tpl->tpl_vars['pagination']->value;?>

    </div>
    <div class="<?php if ($_smarty_tpl->tpl_vars['pagination']->value) {?>col-sm-5<?php } else { ?>col-sm-12<?php }?> text-right">
        <p style="margin-top: 10px;">Показано новостей: <?php echo $_smarty_tpl->tpl_vars['start']->value;?>
-<?php echo $_smarty_tpl->tpl_vars['items_count']->value+$_smarty_tpl->tpl_vars['start']->value-1;?>
 из <?php echo $_smarty_tpl->tpl_vars['total']->value;?>
</p>
    </div>
<?php } else { ?>
    Материалов в данной категории нет
<?php }?>
<?php echo '<script'; ?>
>
    $(".confirm").click(function(e){
        if (!confirm("Вы уверенны что хотите это сделать??")){
            e.preventDefault();
        }
    });
<?php echo '</script'; ?>
><?php }} ?>