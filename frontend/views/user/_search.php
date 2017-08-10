<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model frontend\models\UserSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="user-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'Id') ?>

    <?= $form->field($model, 'Account') ?>

    <?= $form->field($model, 'Password') ?>

    <?= $form->field($model, 'Nickname') ?>

    <?= $form->field($model, 'AvatarUrl') ?>

    <?php // echo $form->field($model, 'Auth_Status') ?>

    <?php // echo $form->field($model, 'Id_Card') ?>

    <?php // echo $form->field($model, 'Name') ?>

    <?php // echo $form->field($model, 'Mobile') ?>

    <?php // echo $form->field($model, 'Weixin_Open_Id') ?>

    <?php // echo $form->field($model, 'Last_Login_Ip') ?>

    <?php // echo $form->field($model, 'Last_Login_Time') ?>

    <?php // echo $form->field($model, 'Registration_IP') ?>

    <?php // echo $form->field($model, 'Registration_Channel') ?>

    <?php // echo $form->field($model, 'Balance') ?>

    <?php // echo $form->field($model, 'Bonus_Target') ?>

    <?php // echo $form->field($model, 'Bonus_Level') ?>

    <?php // echo $form->field($model, 'Bonus_Level_Yesterday') ?>

    <?php // echo $form->field($model, 'Bonus_Today') ?>

    <?php // echo $form->field($model, 'Score') ?>

    <?php // echo $form->field($model, 'Inviter') ?>

    <?php // echo $form->field($model, 'Parent') ?>

    <?php // echo $form->field($model, 'ggfather') ?>

    <?php // echo $form->field($model, 'Inviter_Grade') ?>

    <?php // echo $form->field($model, 'Status') ?>

    <?php // echo $form->field($model, 'Status_Change_Reason') ?>

    <?php // echo $form->field($model, 'Creation_Time') ?>

    <?php // echo $form->field($model, 'Bonus_Day') ?>

    <?php // echo $form->field($model, 'Is_Cash_white') ?>

    <?php // echo $form->field($model, 'Login_Error_Num') ?>

    <?php // echo $form->field($model, 'Pause_Bonus') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-default']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
