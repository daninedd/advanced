<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model frontend\models\User */

$this->title = $model->Name;
$this->params['breadcrumbs'][] = ['label' => 'Users', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="user-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id' => $model->Id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id' => $model->Id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'Id',
            'Account',
            'Password',
            'Nickname',
            'AvatarUrl:ntext',
            'Auth_Status',
            'Id_Card',
            'Name',
            'Mobile',
            'Weixin_Open_Id',
            'Last_Login_Ip',
            'Last_Login_Time',
            'Registration_IP',
            'Registration_Channel',
            'Balance',
            'Bonus_Target',
            'Bonus_Level',
            'Bonus_Level_Yesterday',
            'Bonus_Today',
            'Score',
            'Inviter',
            'Parent',
            'ggfather',
            'Inviter_Grade',
            'Status',
            'Status_Change_Reason:ntext',
            'Creation_Time',
            'Bonus_Day',
            'Is_Cash_white',
            'Login_Error_Num',
            'Pause_Bonus',
        ],
    ]) ?>

</div>
