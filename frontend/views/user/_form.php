<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model frontend\models\User */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="user-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'Id')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Account')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Password')->passwordInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Nickname')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'AvatarUrl')->textarea(['rows' => 6]) ?>

    <?= $form->field($model, 'Auth_Status')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Id_Card')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Name')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Mobile')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Weixin_Open_Id')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Last_Login_Ip')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Last_Login_Time')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Registration_IP')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Registration_Channel')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Balance')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Bonus_Target')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Bonus_Level')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Bonus_Level_Yesterday')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Bonus_Today')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Score')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Inviter')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Parent')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'ggfather')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Inviter_Grade')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Status')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Status_Change_Reason')->textarea(['rows' => 6]) ?>

    <?= $form->field($model, 'Creation_Time')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Bonus_Day')->textInput() ?>

    <?= $form->field($model, 'Is_Cash_white')->textInput() ?>

    <?= $form->field($model, 'Login_Error_Num')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'Pause_Bonus')->textInput(['maxlength' => true]) ?>

    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? 'Create' : 'Update', ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
