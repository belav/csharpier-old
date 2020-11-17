using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.CSharp;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CSharpier.Parser
{
    public class Parser
    {
        public async Task<object> Invoke(object input)
        {
            var node = await CSharpSyntaxTree.ParseText(input as string).GetRootAsync();
            var convertors = new List<JsonConverter>();
            convertors.Add(new CustomJsonSerializer());
            return JsonConvert.SerializeObject(node, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                Converters = convertors
                
            });
        }
    }

    public class CustomJsonSerializer : JsonConverter
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var converters = serializer.Converters.Where(x => !(x is CustomJsonSerializer)).ToArray();

            var jObject = JObject.FromObject(value);
            jObject.AddFirst(new JProperty("Type", value.GetType().Name));
            jObject.WriteTo(writer, converters);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override bool CanConvert(Type objectType)
        {
            throw new NotImplementedException();
        }
    }
}