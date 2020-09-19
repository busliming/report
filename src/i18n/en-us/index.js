/*
 * @Author: Nice
 * @Date: 2020-09-08 10:24:01
 * @Description: 
 * @FilePath: /panda-bc数据源相关报表系统/src/i18n/en-us/index.js
 */

export default {
  test: 'English',
  match_bonus_breadcrumbs: {
    bread1: 'Data Center',
    bread2: 'Match Report',
  },
  match_list: {
    match1: 'All Sports',
    match2: 'Football',
    match3: 'Basketball',
    match4: 'Baseball',
    match5: 'Ice Hockey',
    match6: 'Tennis Ball',
    match7: 'American Football',
    match8: 'Snooker',
    match9: 'Table Tennis',
    match10: 'Volleyball',
    match11: 'Badminton',
    match12: 'LOL',
    match13: 'Dota2',
    match14: 'CS',
    match15: 'Honor Of Kings',
    match16: 'PUBG',
  },
  match_bonus_placeholder: 'Please select the sport',
  match_bonus_time: 'Select Match Start Time',
  match_bonus_config: {
    index: 'Index',
    beginTime: 'Match Start Time',
    matchInfoZS: 'Match Information',
    betAmount: 'Stake(CNY)',
    profitAmount: 'Winning(CNY)',
    preProfit: 'Prematch(CNY)',
    rollingProfit: 'Live(CNY)',
    profitRate: 'Profitability'
  },
  //  注单查询
  bet_slip_breadcrumbs: {
    bread1: 'Data Center',
    bread2: 'Bet Query',
  },
  bet_slip_settle: 'Settlement Time',
  bet_slip_bet: 'Betting Time',
  bet_slip_betting_types: {
    type1: 'Type',
    type2: 'Single',
    type3: 'Multiples',
  },
  bet_slip_bet_types: {
    bet1: 'Pre/Live',
    bet2: 'Prematch',
    bet3: 'Live',
    bet4: 'Outrights',
  },
  bet_slip_order_result: {
    order1: 'Not Settlement',
    order2: 'Settlemented',
    order3: 'Cancelled',
    order4: 'Confirming',
    order5: 'Bet Failed',
  },
  bet_slip_order_status: {
    ord1: "Void",
    ord2: "Lost",
    ord3: "Win",
    ord4: "Half Win",
    ord5: "Half Lost",
    ord6: "Match Cancelled",
    ord7: "Match Postponed",
  },
  bet_slip_order_result_placeholder: 'Select Order Result',
  bet_slip_order_bet_id_placeholder: 'Bet ID/Match ID',
  bet_slip_order_user_name_placeholder: 'User Name/User ID',
  bet_slip_time: 'Time',
  bet_slip_stake: 'Stake',
  bet_slip_win: 'Win/Lost',
  bet_slip_max: 'Max',
  bet_slip_min: 'Min',
  bet_slip_user_bet: 'Bet ID',
  bet_slip_user_user: 'User ID',
  bet_slip_match_id: 'Match ID',
  bet_slip_config: {
    index: 'Index',
    userName: 'User',
    matchInfo: 'Match Info',
    betDetail: 'Order Info',
    odds: 'Odds',
    betAmount: 'Stake',
    userProfit: 'Winning',
    betOnRmb: 'GGR(CNY)',
    currency: 'Currency',
    type: 'Type',
    status: 'Status',
  },
  bet_slip_betting_time: 'Betting Time',
  bet_slip_total_orders: 'Total Orders',
  bet_slip_total_users: 'Amount Of Users',
  bet_slip_total_bets: 'Total Bets',
  bet_slip_total_win: 'User Win/Lost',

  // 授权中心
  auth_breadcrumbs: {
    bread1: 'Authorization Center',
    bread2: 'User Management',
  },
  auth_user_name_placeholder: 'Please Enter User Name',
  auth_admin_placeholder: 'Admin Status',
  auth_add_btn: 'New User',
  auth_modify_btn: 'Modify User',
  auth_all: 'All Status',
  auth_on: 'Enable',
  auth_off: 'Disable',
  auth_tip_edit: 'Modify User',
  auth_tip_delete: 'Delete User',
  auth_tip_delete_tip1: 'Are you sure to delete this user?',
  auth_tip_delete_btn1: 'Yes',
  auth_tip_delete_btn2: 'No',
  auth_tip_delete_tip2: 'Cancel delete user operation!',
  auth_config: {
    index: 'Index',
    userName: 'Username',
    email: 'Email',
    contact: 'Contact',
    role: 'Role',
    createTime: 'Creation Time',
    status: 'Status',
    action: 'Action' 
  },
  // 新建用户弹窗
  auth_new_user: {
    upload: 'Upload',
    userName: 'Username',
    userName_pl: 'Please enter username',
    userName_er: 'Username can not be empty!',
    password: 'Password',
    password_pl: 'Please enter password',
    password_er: 'Password can not be empty!',
    email: 'Email',
    email_pl: 'Please enter email account',
    email_er: 'Email can not be empty!',
    contact: 'Contact',
    contact_pl: 'Please enter contact',
    contact_er: 'Contact can not be empty!',
    role: 'Role Permissions',
    role_pl: 'Please select role permissions',
    role_er: 'Role Permissions can not be empty!',
    status: 'User Status',
    status_pl: 'Please select user status',
    status_er: 'User Status can not be empty!',
  },
  auth_new_user_tip1: 'New user successfully!',
  auth_new_user_tip2: 'Uploaded the avatar successfully!',
  auth_new_user_tip3: 'Failed to upload avatar! Please upload again!',
  auth_modify_user_tip: 'Modify user successfully!',
  auth_modify_user_tip1: 'Failed to modify user!',
  currency: {
    c1:'CNY',
    c2:'USD',
    c3:'HKD',
    c4:'VND',
    c5:'SGD',
    c6:'GBP',
    c7:'EUR',
    c8:'BTC'   
  },
  // 无权限页面
  no_auth_title: 'You do not have permission to access this resource/operation!',
  no_auth_btn: 'Back To Homepage',
  report_btn: 'Report(CSV)',
  yes_btn: 'YES',
  no_btn: 'NO',
  search_btn: 'Search',
  total_data: 'Total Records',
  total: 'Total',
  login_success: 'Login Successful！',
  log_out: 'Log Out',
  log_out_success: 'Log Out Successfully！',
  report: 'The system only supports exporting bets for one day at most, please adjust the query conditions and bet time and try again!',
  session: 'Not logged in or expired, please log in again!'
}
