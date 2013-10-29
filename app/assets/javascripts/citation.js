$(document).ready(function(){
    $('#submit').submit(function(e){
        e.preventDefault();
        mixpanel.track('Tweet Submitted');
        var url = $('#submit-form-url').val();
        if (url==""){
            //$(".controls").addClass("error");
        }
        else {
            //embed Tweet for verification
            $.ajax({
                url: "https://api.twitter.com/1/statuses/oembed.json?url="+url,
                dataType: "jsonp",
                success: function(data){
                    $('#tweet-div').html(data.html);
                }
            });

            //reset form input to original state
            $('#submit-form-url').val('');
            
            //manipulate tweet link to make it Twitter API compatible
            var tweet_url_arr = url.split('/');
            var tweet_id = tweet_url_arr[5];
            var gettweet_url = "/gettweet/"+tweet_id;

            $.ajax({
                url: gettweet_url,
                //dataType: "json",
                success: function(data){
                    //$('#tweet-div').html(data.html);

                    var t_date_raw = data.created_at;
                    var t_author_fullname = data.user.name;
                    var t_author_handle = data.user.screen_name;
                    var t_content = data.text;

                    var t_date_moment = moment.utc(t_date_raw, "ddd MMM DD HH:mm:ss ZZ YYYY");
                    var mla_date = moment.(t_date_moment).format("DD MMM YYYY, HH:mm") + " UTC.";

                        

                //manipulate tweet data variables into variables for citations
                    var author_name_arr = t_author_fullname.split(' ');
                    var mla_name = 0
                    if (author_name_arr.length > 2 || author_name_arr.length <= 1) {
                        mla_name = t_author_fullname+" ("+t_author_handle+"). ";
                        } 
                    else {
                        mla_name = author_name_arr[1]+", "+author_name_arr[0]+" ("+t_author_handle+"). ";
                    }
                 
                    var apa_name = t_author_handle+'. ';
                    var t_date_arr = t_date_raw.split(' ');
                    var t_time_arr = t_date_arr[3].split(':');
                    var mla_time = t_time_arr[0]+':'+t_time_arr[1]+' UTC. ';
                    //var mla_date = t_date_arr[2]+' '+t_date_arr[1]+' '+t_date_arr[5]+', '+mla_time;
                    var apa_date = '('+t_date_arr[5]+', '+t_date_arr[1]+' '+t_date_arr[2]+'). ';

                    var w_name = '"' + t_author_handle + tweet_id + '"';
                    var w_title = '|title= Tweet Number ' + tweet_id;
                    var w_url = '|url= ' + url;
                    var w_author = '|author= ' + t_author_fullname;
                    //var w_date = '|date= '+ 
                
                //create variables of citation strings for MLA and APA
                    mla_citation = mla_name+'"'+t_content+'". '+mla_date+" Tweet";
                    apa_citation = apa_name+apa_date+t_content+" [Twitter post]. "+"Retrieved from "+url;
                
                //create variables of citation strings for Wikipedia 
                    //wiki_citation = 

                //present the citations to the user
                    $('div#mla-citation').html(mla_citation);
                    $('div#apa-citation').html(apa_citation);
                    $('#tweet-div').fadeIn(1500);
                    $('#citations').fadeIn(2000);

                }
            });
             
        }
    })
})

