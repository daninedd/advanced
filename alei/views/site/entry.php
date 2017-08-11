<?php

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model \frontend\models\SignupForm */
use yii\helpers\Html;
use yii\widgets\ActiveForm;
?>
<?php $form = ActiveForm::begin(); ?>
    <?= $form->field($model,"name"); ?>
    <?= $form->field($model,"email"); ?>
    <div class="form-group">
        <?= Html::submitButton("Summit",["class" => "btn btn-primary"]); ?>
    </div>
<?php $form = ActiveForm::end(); ?>
